import { pipeline, env } from '@xenova/transformers';

// Browser config: Allow remote downloads first, then cache locally for offline
env.allowLocalModels = false;
env.allowRemoteModels = true;

export class LLMEngine {
  private model: any = null;
  private modelName = 'distilgpt2';  // Small, fast starter model (~82M params; upgrade later)

  async loadModel() {
    if (this.model) return;  // Already loaded
    console.log('🔄 Loading AI model (first time only)...');
    this.model = await pipeline('text-generation', this.modelName, {
      quantized: true,  // Makes it smaller/faster for browser
      progress_callback: (data: any) => {
        const percent = Math.round((data.loaded / data.total) * 100);
        console.log(`Loading: ${percent}%`);
      },
    });
    console.log('✅ Model loaded! Now offline-ready.');
  }

  async generate(prompt: string, maxLength: number = 200): Promise<string> {
    if (!this.model) {
      await this.loadModel();
    }
    console.log(`🤖 Generating response to: "${prompt}"...`);
    const output = await this.model(prompt, {
      max_new_tokens: maxLength,
      do_sample: true,  // Adds creativity
      temperature: 0.7,  // Balance of random/focused
      pad_token_id: 0,   // Handles end of text
    });
    const fullText = output[0].generated_text;
    const newText = fullText.slice(prompt.length).trim();  // Return only the AI's new part
    console.log(`Generated: ${newText}`);
    return newText;
  }
}
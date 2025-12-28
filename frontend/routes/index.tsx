import { define } from "../utils.ts";
import App from "../islands/App.tsx";

export default define.page(() => {
  return (
    <div class="min-h-screen bg-base-200 relative overflow-hidden">
      {/* Background decorative blurs */}
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="absolute w-100 h-100 rounded-full bg-primary/30 -top-32 -right-32 blur-3xl">
        </div>
        <div class="absolute w-80 h-80 rounded-full bg-primary/25 bottom-20 -left-20 blur-2xl">
        </div>
        <div class="absolute w-50 h-40 rounded-full bg-primary/20 top-1/2 right-32 blur-xl">
        </div>
      </div>

      <div class="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div class="w-full max-w-4xl space-y-6">
          <App />
        </div>
      </div>
    </div>
  );
});

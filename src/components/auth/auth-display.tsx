export default function AuthDisplay() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-gradient-to-l from-blue-500 to-blue-800" />
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Formly has helped me create stunning forms without any hassle
            for my surveys.&rdquo;
          </p>
          <footer className="text-sm">John Doe</footer>
        </blockquote>
      </div>
    </div>
  );
}

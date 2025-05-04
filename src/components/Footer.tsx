import Logo from "./logo";

export function Footer() {
  return (
    <footer className="border-t ">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <Logo />

          <p className="mt-4 text-sm text-muted-foreground">
            &quot;On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment&quot;
          </p>
        </div>

        <div className="mt-12  ">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Tastebite - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

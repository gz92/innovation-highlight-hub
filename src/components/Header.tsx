
import { useAnimateIn } from "../utils/animations";

interface HeaderProps {
  innovationDescription: string;
}

const Header = ({ innovationDescription }: HeaderProps) => {
  const animate = useAnimateIn();
  
  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className={`space-y-6 transition-all duration-1000 ease-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-block mb-2">
          <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
            Innovation Spotlight
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Innovation Spotlight
        </h1>
        
        <p className="text-muted-foreground max-w-3xl text-lg md:text-xl font-normal leading-relaxed text-pretty">
          {innovationDescription}
        </p>
      </div>
    </header>
  );
};

export default Header;

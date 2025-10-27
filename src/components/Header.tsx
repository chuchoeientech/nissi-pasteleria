export default function Header() {
  return (
    <header className="bg-white shadow-sm py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-2">
          NISSI
        </h1>
        <p className="font-body text-lg md:text-xl text-gray-600">
          pastelería
        </p>
        <p className="font-body text-sm md:text-base text-gray-500 mt-3 italic">
          Pastelería artesanal hecha con amor
        </p>
      </div>
    </header>
  );
}

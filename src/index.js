import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-primary">EventConnect</h1>
        <nav className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-primary">Inicio</a>
          <a href="#" className="text-gray-700 hover:text-primary">Explorar Servicios</a>
          <a href="#" className="text-gray-700 hover:text-primary">Registrarse</a>
          <a href="#" className="text-gray-700 hover:text-primary">Iniciar Sesión</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h2 className="text-4xl font-bold">Encuentra los mejores servicios para tu evento</h2>
        <div className="mt-6 flex justify-center">
          <Input placeholder="Buscar servicios..." className="w-1/3 p-3" />
        </div>
        <div className="mt-4 space-x-4">
          <Button variant="secondary">Explorar Servicios</Button>
          <Button className="bg-white text-blue-500">Regístrate como Organizador</Button>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="p-10">
        <h3 className="text-3xl font-bold">Servicios Populares</h3>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((service) => (
            <Card key={service} className="p-4">
              <img src="https://via.placeholder.com/300" alt="Service" className="rounded-md" />
              <CardContent>
                <h4 className="text-lg font-semibold">Servicio {service}</h4>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 w-5 h-5" />
                  ))}
                </div>
                <Button className="mt-4 w-full">Ver Detalles</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="p-10 bg-gray-100">
        <h3 className="text-3xl font-bold">Lo que dicen nuestros clientes</h3>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((testimonial) => (
            <Card key={testimonial} className="p-4">
              <CardContent>
                <p className="italic">“Excelente servicio, muy recomendado.”</p>
                <div className="flex items-center mt-2">
                  <img src="https://via.placeholder.com/50" alt="Client" className="rounded-full w-10 h-10 mr-2" />
                  <span className="font-semibold">Cliente {testimonial}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-purple-600 text-white">
        <h3 className="text-3xl font-bold">¿Eres un organizador? Únete a nosotros y ofrece tus servicios</h3>
        <Button className="mt-4 bg-white text-purple-600">Regístrate como Organizador</Button>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-gray-900 text-white flex justify-between">
        <div>
          <a href="#" className="block hover:underline">Contacto</a>
          <a href="#" className="block hover:underline">Preguntas Frecuentes</a>
          <a href="#" className="block hover:underline">Términos y Condiciones</a>
          <a href="#" className="block hover:underline">Política de Privacidad</a>
        </div>
        <div>
          <p>Email: contacto@eventconnect.com</p>
          <p>Teléfono: +57 300 123 4567</p>
        </div>
      </footer>
    </div>
  );
}

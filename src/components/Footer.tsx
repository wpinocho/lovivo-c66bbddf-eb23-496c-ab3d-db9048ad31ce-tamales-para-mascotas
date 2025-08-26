export const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🌽</span>
              Tamales Pet
            </h3>
            <p className="text-green-200">
              Los mejores tamales artesanales para tu mascota. 
              Nutrición y sabor en cada bocado.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-green-200">
              <p>📞 (555) 123-4567</p>
              <p>📧 info@tamalespet.com</p>
              <p>📍 Av. Mascotas 123, Ciudad Pet</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-2 text-green-200">
              <p>Lunes - Viernes: 8:00 AM - 8:00 PM</p>
              <p>Sábados: 9:00 AM - 6:00 PM</p>
              <p>Domingos: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 Tamales Pet. Todos los derechos reservados. Hecho con ❤️ para las mascotas.</p>
        </div>
      </div>
    </footer>
  );
};

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle } from "lucide-react";

const photos = [
  {
    id: "1",
    name: "Foto 1",
    description: "Foto profissional de evento noturno.",
    thumbnail: "/fotos/foto1_marcada.jpg",
    original: "/fotos/foto1_original.jpg",
    price: 15.0,
    comprado: false,
  },
  {
    id: "2",
    name: "Foto 2",
    description: "Ensaio ao pôr do sol com edição premium.",
    thumbnail: "/fotos/foto2_marcada.jpg",
    original: "/fotos/foto2_original.jpg",
    price: 20.0,
    comprado: false,
  },
];

export default function PainelFotos() {
  const [abaAtiva, setAbaAtiva] = useState("fotos");
  const [carrinho, setCarrinho] = useState([]);
  const [comprado, setComprado] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [email, setEmail] = useState("");

  const adicionarAoCarrinho = (foto) => {
    if (!carrinho.find((item) => item.id === foto.id)) {
      setCarrinho([...carrinho, foto]);
    }
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const finalizarPedido = () => {
    const comprados = carrinho.map((foto) => foto.id);
    setComprado([...comprado, ...comprados]);
    setCarrinho([]);
    setIsCheckout(false);
    alert("Pagamento realizado com sucesso! Fotos liberadas.");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-center gap-4 mb-6">
        <Button
          variant={abaAtiva === "fotos" ? "default" : "outline"}
          onClick={() => setAbaAtiva("fotos")}
        >
          Fotos
        </Button>
        <Button
          variant={abaAtiva === "sobre" ? "default" : "outline"}
          onClick={() => setAbaAtiva("sobre")}
        >
          Sobre
        </Button>
        <Button
          variant={abaAtiva === "contato" ? "default" : "outline"}
          onClick={() => setAbaAtiva("contato")}
        >
          Contato
        </Button>
      </header>

      {abaAtiva === "fotos" && (
        !isCheckout ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((foto) => {
              const liberado = comprado.includes(foto.id);
              return (
                <Card key={foto.id} className="relative group shadow-md rounded-2xl overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={liberado ? foto.original : foto.thumbnail}
                      alt={foto.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-1">{foto.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">{foto.description}</p>
                    <div className="flex justify-between items-center">
                      {liberado ? (
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Liberada
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => adicionarAoCarrinho(foto)}
                          variant="secondary"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" /> R$ {foto.price.toFixed(2)}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto mt-8 bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Finalizar Compra</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email para receber as fotos"
              className="w-full mb-4 p-2 border rounded"
            />
            <ul className="mb-4">
              {carrinho.map((item) => (
                <li key={item.id} className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>R$ {item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={finalizarPedido}>
              Pagar Agora (simulado)
            </Button>
          </div>
        )
      )}

      {abaAtiva === "sobre" && (
        <div className="text-center text-gray-700 mt-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sobre</h2>
          <p>
            Bem-vindo à nossa plataforma de venda de fotos! Aqui você encontra registros incríveis
            de momentos únicos. Nossa missão é entregar qualidade, praticidade e emoção através da fotografia.
          </p>
        </div>
      )}

      {abaAtiva === "contato" && (
        <div className="text-center text-gray-700 mt-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Contato</h2>
          <p>
            Dúvidas ou sugestões? Entre em contato conosco pelo e-mail
            <a href="mailto:contato@tssfotografia.com" className="text-blue-600 font-semibold ml-1">
              contato@tssfotografia.com
            </a>
            . Estamos prontos para te ajudar!
          </p>
        </div>
      )}

      {carrinho.length > 0 && !isCheckout && abaAtiva === "fotos" && (
        <div className="fixed bottom-4 right-4 bg-white border shadow-lg p-4 rounded-2xl w-72">
          <h2 className="text-lg font-semibold mb-2">Carrinho</h2>
          <ul className="mb-2 max-h-40 overflow-y-auto">
            {carrinho.map((item) => (
              <li key={item.id} className="flex justify-between text-sm mb-1 items-center">
                <span>{item.name}</span>
                <Button size="icon" variant="ghost" onClick={() => removerDoCarrinho(item.id)}>
                  ✕
                </Button>
              </li>
            ))}
          </ul>
          <Button className="w-full" onClick={() => setIsCheckout(true)}>
            Finalizar Pedido
          </Button>
        </div>
      )}
    </div>
  );
}

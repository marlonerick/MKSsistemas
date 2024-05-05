"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface Product {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantidade: number;
  description: string;
}
export default function Home() {
  // modal
  const [isOpen, setIsOpen] = useState(false);
  // API
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  // Contador carrinho
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState<Number>(0);

  // API produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=price&orderBy=ASC');
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        console.log('Dados da API:', data);
        if (!data || !Array.isArray(data.products)) {
          throw new Error('Dados da API não estão em um formato esperado');
        }
        setProdutos(data.products);
        console.log('Dados carregados:', data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Abrir modal
  const openModal = () => {
    setIsOpen(true);
    console.log("true")
  };
  // Fechar modal
  const closeModal = () => {
    setIsOpen(false);
  };
  // Adicionar ao carrinho
  const adicionarCarrinho = (product: Product) => {
    setCartItems([...cartItems, product]);
    setCartCount(cartCount + 1);

  };
  const calcularTotal = () => {
    const total = cartItems.reduce((total, product) => total + Number(product.price), 0);
    return total;
  };

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between" >
      <nav className="flex justify-between items-center px-10 bg-[#0F52BA] w-full h-20">
        <div className='flex flex-row'>
          <h1 className='text-3xl font-medium mx-1'>MKS
          </h1>
          <h2>Sistemas</h2>
        </div>

        <button className="w-[90px] h-[45px] bg-white text-black rounded-md" onClick={() => openModal()}>🛒{cartCount}</button>
        {isOpen && (
          <div className="flex absolute">
            <div className={` flex flex-col justify-between sidebar fixed right-0 top-0 h-screen bg-[#0F52BA] transition-all duration-300 shadow-lg shadow-zinc-950/60 shadow-l-2 shadow-l-[10px] -shadow-spread-2 ${isOpen ? 'w-96' : 'w-0'}`}>
              <div className='flex justify-between '>
                <h1 className="text-2xl font-bold m-4 w-30 px-4">Carrinho <p>de compras</p></h1>
                <button className="absolute top-4 right-4 text-white bg-black rounded-full w-10 h-10" onClick={closeModal}>X</button>
              </div>

              <div className="grid grid-cols-1 gap-2 overflow-auto ">
                {cartItems.length > 0 ? (
                  cartItems.map(product => (
                    <div key={product.id} className="flex flex-row justify-between items-center w-30 h-20 bg-white m-1 rounded-lg mx-8 text-sm text-black ">
                      <div className='flex flex-row items-center w-28'>
                        <img src={product.photo} alt={product.name} className="w-14 h-14" />
                        <p className='text-[12px]'>{product.name}</p>
                      </div>
                      <div className=" flex flex-row items-center">
                        <div className='flex flex-col '>
                          <p>Qtd:</p>
                          <div className='flex flex-row justify-between items-center border-2 border-gray-300 rounded-lg w- h-8 mx-2'>
                            {/* Adicionar funções para incrementar e decrementar a quantidade */}
                            <button className='p-1 items-center' > - </button>
                            <button className='p-1 border-l-2 border-gray-300'> 1 </button>
                            <button className='p-1 border-l-2 border-gray-300'> + </button>
                          </div>
                        </div>
                        <p className="font-bold">R${product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-2xl font-bold m-4 w-30 px-4">Carrinho vazio</p>
                )}
              </div>

              <div>
                <div className='flex flex-row justify-between px-8  my-4 text-xl font-bold text-white'>
                  <p>Total:</p>
                  <p>Total: R${calcularTotal()}</p>
                </div>
                <button className='w-full h-24 bg-gray-950 text-white font-bold text-xl -'>Finalizar Compra</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-black px-20">
        {produtos.length > 0 ? (
          produtos.map(product => (
            <div key={product.id} className="flex flex-col justify-between items-center shadow-xl shadow-gray-900/10 rounded-lg h-[225px] w-[225px]">
              <div>
                <img src={product.photo} alt={product.name} className="w-14 h-14 object-cover mb-2" />
              </div>
              <div className='flex flex-row justify-evenly text-sm items-center mx-4'>
                <p className=''>{product.name}</p>
                <div className='mx-2 bg-slate-800 p-2 rounded-md text-white font-bold'>
                  <p className="text-sm">R${product.price}</p>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] w-full px-5">{product.description}</h3>
              </div>
              <div className='w-full h-10'>
                <button className='w-full h-10 bg-blue-600 text-white font-bold text-xl rounded-b-lg' onClick={() => adicionarCarrinho(product)}>🛍 Comprar</button>
              </div>
            </div>
          ))
        ) : (
          <>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col items-center shadow-xl shadow-gray-950 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-200 h-28 w-28 mb-2"></div>
                <div className="bg-gray-200 h-4 w-28 mb-2"></div>
                <div className="bg-gray-200 h-4 w-28 mb-2"></div>
              </div>
            ))}
          </>
        )}
      </div>

      <footer className="w-screen h-10 text-sm bg-gray-300 text-black mb-0 text-center py-2">
        MKS sistemas © Todos direitos reservados.
      </footer>
    </main >
  );
}

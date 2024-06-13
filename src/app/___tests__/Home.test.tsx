import '@testing-library/jest-dom'
import Home from '@/app/page'
// const fetch = require('node-fetch');
import Footer from '@/app/components/footer'
import { render, screen } from '@testing-library/react'


it("Titulo da navbar", () => {
    render(<Home />);
    expect(screen.getByText("MKS")).toBeInTheDocument();

})

it("Subtitulo da navbar", () => {
    render(<Home />);
    expect(screen.getByText("Sistemas")).toBeInTheDocument();

})

describe("Rodapé", () => {
    it("Deve renderizar o titulo do rodapé", () => {
        render(<Footer />);
        expect(screen.getByText("MKS sistemas © Todos direitos reservados.")).toBeInTheDocument();

    })
})

// describe("API REST Full", () => {
//     it("Dados da API REST Full carregados", async () => {
//         const response = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=price&orderBy=ASC');
//         expect(response.ok).toBe(true);

//         const data = await response.json();
//         console.log(data);  // Opcional: apenas para ver os dados no console durante o teste
//         expect(data).toBeDefined();
//         expect(Array.isArray(data.products)).toBe(true);
//     })
// })
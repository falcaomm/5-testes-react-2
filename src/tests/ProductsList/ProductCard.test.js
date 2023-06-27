import { render, screen } from "@testing-library/react"
import ProductCard from "../../components/ProductsList/ProductCard"
import userEvent from "@testing-library/user-event"

const productMock = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}

// const addToCartMock = () => { return "adicionou no carrinho" } não se espera que a função retorne nada pq ela faz uma requisição pra api mas pro componente em si ela não faz nada (não altera o componente)
//IMPORTANTE - mocks manuais não podem usar as funções de asserções do jest por isso -> 

const addToCartMock = jest.fn() //uma função sem retonro é só abrir o paranteses se eu quiser q a função faça algo é só colocar um callback dentro do parenteses / mesmo que a fução real espere um parametro não precisa colocar se ela não espera um retorno 

describe("Testes do ProductCard", () => {

    test("Renderização do card", () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />) // se tentar rodar sem criar o mock o teste nem roda pq o proprio componente espera as informações para rodar - dentro do proprio render passa os props mokados com mesmo nome  que tão sendo passados no componente que ta sendo renderizado 
        // screen.logTestingPlaygroundURL()
        const image = screen.getByAltText(/fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i) // essas barras são por causa do regex 
        const title = screen.getByRole('heading', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
        })
        const price = screen.getByText(/\$109\.95/i)
        const button = screen.getByText(/buy/i)

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(button).toBeInTheDocument() 
        // expect(button).not.toBeInTheDocument() para saber se não caiu em um falso positivo colocar o not como teste pq se não passar sginifica que o teste rodou certinho renderizou os elementos e falhou quando tu espera que um não tenha renderizado
    })

    test("Quando o botão de comprar for clicado deve adiconar o produto no carrinho", async() => {
        //na teoria o product card não tem como saber o componente de carrinho para saber se as coisas foram adionadas, porém voce pode testar se a função addtocartmock envia como argumento o produto

        const user = userEvent.setup()
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />) 
        
        const button = screen.getByText(/buy/i)
        
        await user.click(button)

        expect(addToCartMock).toHaveBeenCalledTimes(1) // foi chamada uma vez
        expect(addToCartMock).toHaveBeenCalledWith(productMock) // assim você verifica se as coisas foram mandadas pro carrinho
        expect(addToCartMock).toHaveReturned() // testa se foi chamada ate o final se não deu problema no meio

        //esse teste testa se a função foi chamada e se as coisas foram amndadas 
        // testar a função em si e o carrinho é responsabilidde de outros testes e componentes 
    })
    
})
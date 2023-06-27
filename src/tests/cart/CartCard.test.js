import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CartCard from "../../components/Cart/CartCard"


const productMock = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    quantity: 1
}

const removeFromCartMock = jest.fn()

describe('Testes do CartCard', () => { 
    test("Teste derenderização de itens do cart card", () => {
        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)
        const image = screen.getByAltText(/fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i) 
        const title = screen.getByRole('heading', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
        })
        const price = screen.getByText(/\$109\.95/i)
        const quantity = screen.getByText(/x/i)
        const button = screen.getByText(/remove/i)

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()
        expect(button).toBeInTheDocument() 
    })

    test("Quando o botão de remover for clicado, deve remover o produto do carinho", async () => {
        const user = userEvent.setup()
        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)

        const button = screen.getByText(/remove/i)
        await user.click(button)

        expect(removeFromCartMock).toBeCalledWith(productMock)
    })
})
const initState = {
 carts: [],
 totalPrice: 0,
 totalAmount: 0
}

export default function cartReducer( state = initState, action) {
  switch (action.type) {
    case 'ADD_CART': {
      const { product, quantity } = action.payload;
      let isExistItem = state.carts.find(item => Object.is(item.product._id, product._id));

      if(isExistItem) {
        let itemNewExist = {
          ...isExistItem,
          quantity: parseInt(isExistItem.quantity) + parseInt(quantity)
        };

        let itemsWithoutExist = state.carts.filter(item => !Object.is(item.product._id, product._id));
        let newCart = [...itemsWithoutExist, itemNewExist]

        // let totalPrice = newCart.reduce((prevVal, currentVal) => {
        //   const { quantity, product: { price }} = currentVal;
        //   let totalPriceOfItem = parseInt(quantity) * parseInt(price);
        //   return prevVal + totalPriceOfItem;
        // }, 0);
        let total = newCart.reduce((prevVal, currentVal) => {
          const { quantity, product: { price }} = currentVal;
          const { totalPrice, totalAmount} = prevVal;

          let totalPriceOfItem = parseInt(quantity) * price;
          let newtotalPrice = totalPrice + totalPriceOfItem;

          let totalQuantity = parseInt(quantity) + totalAmount;
          return { 
            totalPrice: newtotalPrice,
            totalAmount: totalQuantity
          }
        }, { totalPrice: 0, totalAmount: 0});

        return {
          carts: newCart, 
          totalPrice: total.totalPrice,
          totalAmount: total.totalAmount
        }
      }else {
        let newCart = [...state.carts, { product, quantity}]

        let total = newCart.reduce((prevVal, currentVal) => {
          let { quantity, product: { price }} = currentVal;
          const { totalPrice, totalAmount} = prevVal;
          
          let totalPriceOfItem = parseInt(quantity) * price;
          let newtotalPrice = totalPrice + totalPriceOfItem;

          let totalQuantity = parseInt(quantity) + totalAmount;
          return { 
            totalPrice: newtotalPrice,
            totalAmount: totalQuantity
          }
        }, { totalPrice: 0, totalAmount: 0});

        return {
          ...state,
          carts: newCart, 
          totalPrice: total.totalPrice,
          totalAmount: total.totalAmount
        }
      }      
    }      
    case 'REMOVE_CART': {
      let { totalPrice, carts, totalAmount } = state;
      
      let isProduct = carts.find(item => item.product._id === action.payload);
      let newTotalPrice = totalPrice - (parseInt(isProduct.quantity) * parseInt(isProduct.product.price));
      let newTotalAmount = totalAmount - parseInt(isProduct.quantity);

      return {
        ...state,
        carts: state.carts.filter(item => !Object.is(item.product._id, action.payload)),
        totalPrice: newTotalPrice,
        totalAmount: newTotalAmount
      };
    }
    default:
      return state;
  }
}
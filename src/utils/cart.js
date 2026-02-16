const CART_STORAGE_KEY = 'nxt_trendz_cart'

export const getCartItems = () => {
  const rawItems = localStorage.getItem(CART_STORAGE_KEY)
  if (!rawItems) {
    return []
  }

  try {
    const parsedItems = JSON.parse(rawItems)
    return Array.isArray(parsedItems) ? parsedItems : []
  } catch (error) {
    return []
  }
}

export const saveCartItems = items => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const addItemToCart = item => {
  const currentItems = getCartItems()
  const existingItem = currentItems.find(current => current.id === item.id)

  let nextItems
  if (existingItem) {
    nextItems = currentItems.map(current =>
      current.id === item.id
        ? {...current, quantity: current.quantity + item.quantity}
        : current,
    )
  } else {
    nextItems = [...currentItems, item]
  }

  saveCartItems(nextItems)
  return nextItems
}

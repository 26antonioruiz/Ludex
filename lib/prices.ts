export interface PriceDeal {
  dealID: string
  price: number
  storeID: number
}

export async function getPrices(
  gameName: string
): Promise<PriceDeal[]> {
  try {
    // Buscar juego
    const searchRes = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
        gameName
      )}&limit=5`
    )

    const searchData = await searchRes.json()

    if (!searchData?.length) {
      return []
    }

    const game = searchData[0]

    // Obtener deals
    const dealsRes = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${game.gameID}`
    )

    const dealsData = await dealsRes.json()

    if (!dealsData?.deals) {
      return []
    }

    // Limpiar deals
    const cleanDeals: PriceDeal[] =
      dealsData.deals
        .filter(
          (deal: any) =>
            deal.price &&
            deal.storeID
        )
        .map((deal: any) => ({
          dealID: deal.dealID,
          price: parseFloat(deal.price),
          storeID: Number(deal.storeID),
        }))
        .sort(
          (a: PriceDeal, b: PriceDeal) =>
            a.price - b.price
        )

    return cleanDeals
  } catch (error) {
    console.log(
      'ERROR GETTING PRICES:',
      error
    )

    return []
  }
}
export interface PriceDeal {
  dealID: string
  price: number
  storeID: number
}

export async function getPrices(gameName: string): Promise<PriceDeal[]> {
  try {
    const res = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
        gameName
      )}&limit=5`
    )

    const data = await res.json()

    if (!data?.length) return []

    const game = data[0]

    const dealsRes = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${game.gameID}`
    )

    const dealsData = await dealsRes.json()

    if (!dealsData?.deals) return []

    const cleanDeals: PriceDeal[] = dealsData.deals
      .filter((d: any) => d.price && d.storeID)
      .map((d: any) => ({
        dealID: d.dealID,
        price: parseFloat(d.price),
        storeID: Number(d.storeID),
      }))
      .sort((a: PriceDeal, b: PriceDeal) => a.price - b.price)

    return cleanDeals
  } catch (error) {
    console.log('ERROR PRICES:', error)
    return []
  }
}
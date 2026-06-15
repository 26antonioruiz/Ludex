export interface DealGame {
  dealID: string
  gameID: string
  title: string
  thumb: string
  salePrice: string
  normalPrice: string
  savings: string
  steamRatingPercent: string
}

export async function getDeals(): Promise<
  DealGame[]
> {
  try {
    const res = await fetch(
      'https://www.cheapshark.com/api/1.0/deals?pageSize=100&sortBy=Savings'
    )

    const data = await res.json()

    if (!data?.length) {
      return []
    }

    const cleanDeals = data
      .filter((deal: any) => {
        const savings = Number(
          deal.savings
        )

        const rating = Number(
          deal.steamRatingPercent || 0
        )

        const price = Number(
          deal.salePrice
        )

        const title = (
          deal.title || ''
        ).toLowerCase()

        if (price <= 0) return false

        if (
          title.includes('pack') ||
          title.includes('dlc') ||
          title.includes('soundtrack') ||
          title.includes('currency') ||
          title.includes('coins') ||
          title.includes('points') ||
          title.includes('skins')
        ) {
          return false
        }

        if (savings < 40) {
          return false
        }

        if (rating < 70) {
          return false
        }

        return true
      })
      .slice(0, 20)

    return cleanDeals.map(
      (deal: any) => ({
        dealID: deal.dealID,
        gameID: deal.gameID,
        title: deal.title,
        thumb: deal.thumb,
        salePrice: deal.salePrice,
        normalPrice:
          deal.normalPrice,
        savings: deal.savings,
        steamRatingPercent:
          deal.steamRatingPercent,
      })
    )
  } catch (error) {
    console.log(
      'ERROR GETTING DEALS:',
      error
    )

    return []
  }
}
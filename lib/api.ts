const API_KEY = '3348181a516f4e3ba8ddef56af9a9d03'

export interface RawgGame {
  id: number
  name: string
  background_image: string
}

export async function getGames(search = ''): Promise<{ results: RawgGame[] }> {
  try {
    const url = search
      ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
          search
        )}&search_exact=true&page_size=20`
      : `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`

    const res = await fetch(url)

    if (!res.ok) throw new Error('Error en la API RAWG')

    const data = await res.json()

    const cleanGames: RawgGame[] = (data.results || []).filter(
      (game: any) =>
        game?.id &&
        typeof game.id === 'number' &&
        game?.name &&
        game?.background_image
    )

    return { results: cleanGames }
  } catch (error) {
    console.log('ERROR API:', error)
    return { results: [] }
  }
}
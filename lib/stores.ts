export const storeMap: any = {
  1: {
    name: 'Steam',
    logo: 'https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg',
  },
  7: {
    name: 'GOG',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/GOG.com_logo.svg',
  },
  11: {
    name: 'Humble',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Humble_Bundle_Logo.png',
  },
  13: {
    name: 'Ubisoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Ubisoft_logo.svg',
  },
  25: {
    name: 'Epic Games',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg',
  },
  15: {
    name: 'Fanatical',
    logo: 'https://cdn.fanatical.com/production/static/website/images/fanatical-logo.png',
  },
  3: {
    name: 'GreenManGaming',
    logo: 'https://www.greenmangaming.com/favicon.ico',
  },
  23: {
    name: 'GameBillet',
    logo: 'https://www.gamebillet.com/favicon.ico',
  },
}

// 🔥 ESTO TE FALTA
export const getStore = (id: number) => {
  return (
    storeMap[id] || {
      name: `Store ${id}`,
      logo: 'https://via.placeholder.com/40',
    }
  )
}
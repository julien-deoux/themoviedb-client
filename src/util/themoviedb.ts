const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '462ee44dc8a26b200dbc1ef923305ae2'

export const query = (resource: string): string => apiUrl + resource + '?language=fr-FR&api_key=' + apiKey

export const get = (query: string): Promise<any> => fetch(query).then(res => res.json())

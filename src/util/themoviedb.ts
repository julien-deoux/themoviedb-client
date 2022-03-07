/**
 * Utility functions to call the API.
 * 
 * Ideally this file would abstract away all side-effects related to API calls, provide safe and pure
 * functions, and would be the sole focus of integration tests.
 * Right now, queries are partially constructed outside of this file, which isn't ideal.
 * 
 * Such an abstraction would also add type safety to responses by converting nullable fields into Maybes.
 * See function backdropUrl in stores/movies.ts for an example of unsafe cases that should be handled right after the API call.
 */

const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '462ee44dc8a26b200dbc1ef923305ae2'

export const query = (resource: string): string => apiUrl + resource + '?language=fr-FR&api_key=' + apiKey

export const get = (query: string): Promise<any> => fetch(query).then(res => res.json())

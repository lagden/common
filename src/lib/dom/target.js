/**
 * Pega o id do elemento
 * @param {string} [id='my_script_tag_id'] - Id do elemento
 * @return {string} Retorna o id
 */
export function getTargetId(id = 'my_id') {
	return new URL(import.meta.url).searchParams.get('id') ?? id
}

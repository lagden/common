/**
 * Tranforma o formulário em query-string
 * @param {FormData} formData - instância do FormData
 * @param {boolean} toString  - converte para string
 * @return {string} Retorna uma query-string
 */
export function form2qs(formData, toString = true) {
	const searchParams = new URLSearchParams()
	for (const [k, v] of formData.entries()) {
		searchParams.append(k, v)
	}
	return toString ? searchParams.toString() : searchParams
}

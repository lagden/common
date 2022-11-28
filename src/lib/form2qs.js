/**
 * Tranforma o formulário em query-string
 * @param {FormData} formData - instância do FormData
 * @return {string} Retorna uma query-string
 */
export function form2qs(formData) {
	const searchParams = new URLSearchParams()
	for (const [k, v] of formData.entries()) {
		searchParams.append(k, v)
	}
	return searchParams.toString()
}

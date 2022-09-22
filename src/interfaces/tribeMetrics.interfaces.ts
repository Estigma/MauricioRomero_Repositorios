
interface TribeMetricsDTO {
    id: number
    name: string
    tribe: string
    organization: string
    coverage: string
    code_smells: number
    bugs: number
    vulnerabilities: number
    hotspots: number
    status: string
    state: string
}

export default TribeMetricsDTO
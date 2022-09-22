import faker from 'faker'
import { Organization } from '../../src/entities/organization.entities'
import { Tribe } from '../../src/entities/tribe.entities'
import { Repository } from '../../src/entities/repository.entities'
import { Metrics } from '../../src/entities/metrics.entities'
import TribeMetricsDTO from '../../src/interfaces/tribeMetrics.interfaces'

export function generateOrganizationData(overide = {}) {
    return {
        id_organization: faker.random.number(10),
        name: faker.lorem.words(3),
        status: faker.random.number(3),
        tribes: [],
        ...overide
    }
}

export function generateOrganizationsData(n: number = 1) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateOrganizationData() as unknown as Organization
    });
  }

  export function generateTribeData(overide = {}) {
    return {
        id_tribe: faker.random.number(10),
        organization: new Organization(),
        name: faker.lorem.words(3),
        status: faker.random.number(3),
        repositories: [],
        ...overide
    }
}

export function generateTribesData(n: number = 1) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateTribeData()
    });
  }

  export function generateRepositoryData(overide = {}) {
    return {
        id_repository: faker.random.number(10),
        tribe: new Tribe(),
        name: faker.lorem.words(3),
        state: 'E',
        create_time: faker.date.between('20200101','20230101'),
        status: 'A',
        metrics: new Metrics(),
        ...overide
    }
}

export function generateRepositoriesData(n: number = 1) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateRepositoryData()
    });
  }

  export function generateMetricsData(overide = {}) {
    return {
        id_repository: faker.random.number(10),
        coverage: 0.01 * faker.random.number(100),
        bugs: faker.random.number(10),
        vulnerabilities: faker.random.number(10),
        hotspot: faker.random.number(10),
        code_smells: faker.random.number(10),
        repository: new Repository(),
        ...overide
    }
}

export function generateMetricData(n: number = 1) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateMetricsData()
    });
  }

  export function generateTribeMetricsData(overide = {}) {
    return {
        id: faker.random.number(10),
        name: faker.lorem.words(3),
        tribe: faker.lorem.words(3),
        organization: faker.lorem.words(3),
        coverage: 0.01 * faker.random.number(100) + "%",
        code_smells: faker.random.number(10),
        bugs: faker.random.number(10),
        vulnerabilities: faker.random.number(10),
        hotspots: faker.random.number(10),
        status: faker.lorem.words(1),
        state: 'D',
        ...overide
    }
}

export function generateNTribeMetricsData(n: number = 1) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateTribeMetricsData()as unknown as TribeMetricsDTO
    });
  }
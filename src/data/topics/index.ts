export interface TopicResources {
  basics?: {
    normalCycle?: {
      length: string;
      bleeding: string;
      fertileWindow: string;
    };
    seekHelp?: string[];
  };
  commonProblems?: CommonProblem[];
  products?: Product[];
  services?: Service[];
  mythsVsFacts?: MythsVsFacts;
}

export interface CommonProblem {
  name: string;
  symptoms: string[];
  solutions: string[];
}

export interface Product {
  name: string;
  cost: string;
  pros: string[];
  cons: string[];
  availableAt: string[];
  sustainable: boolean;
  brands?: string[];
}

export interface Service {
  name: string;
  address: string;
  phone: string;
  website?: string;
  county: string;
}

export interface MythsVsFacts {
  myths: string[];
  facts: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  easyReadContent?: string;
  resources?: TopicResources;
}

import overviewRights from './overview-rights';
import pubertyAdolescentHealth from './puberty-adolescent-health';
import menstrualHealth from './menstrual-health';
import sexualHealthProtection from './sexual-health-protection';
import pregnancyParenthood from './pregnancy-parenthood';
import mentalHealthWellbeing from './mental-health-wellbeing';
import relationshipsSupport from './relationships-support';

export const topics: Topic[] = [
  overviewRights,
  pubertyAdolescentHealth,
  menstrualHealth,
  sexualHealthProtection,
  pregnancyParenthood,
  mentalHealthWellbeing,
  relationshipsSupport,
];

export default topics;
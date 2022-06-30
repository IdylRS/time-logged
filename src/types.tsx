export type Skill =
    "attack" | "hitpoints" | "mining" |
    "strength" | "agility" | "smithing" |
    "defence" | "herblore" | "fishing" |
    "ranged" | "thieving" | "cooking" |
    "prayer" | "crafting" | "firemaking" |
    "magic" | "fletching" | "woodcutting" |
    "runecraft" | "slayer" | "farming" |
    "construction" | "hunter";

export interface Quest {
    tier: number,
    miniquest: boolean,
    shortName: string,
    name: string,
    url: string,
    members: boolean,
    difficulty: string,
    questLength: string,
    requirements: {
        quests: string[],
        skills: SkillRequirement[];
    },
    rewards: {
        Experience: {
            skill: Skill,
            amount: number
        }[],
        QuestPoints: number
    },
    series?: string;
}

interface SkillRequirement {
    skill: Skill | "quest" | "combat";
    level: number;
    boostable: boolean;
}

type Diary =
    "ardougne" | "desert" | "falador" |
    "fremennik" | "kandarin" | "karamja" |
    "kourend & kebos" | "lumbridge & draynor" | "morytania" |
    "varrock" | "western provinces" | "wilderness";

export interface DiaryStep {
    id: string,
    task: string;
    diary: Diary;
    difficulty: "easy" | "medium" | "hard" | "elite";
    tier: number,
    quests?: string[];
    weight?: number;
}

export interface Item {
    id: string;
    name: string;
    tier: number;
    baseTime: number;
    timeRange: number;
    image?: string;
    notes?: string;
    weight?: number;
}

export interface Clue {
    name: string;
    difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'elite' | 'master';
    difficultyId: "0" | "1" | "2" | "3" | "4" | "5";
    tier: number;
    obsoleteTier?: number;
}

export interface ClueTier {
    name: string;
    image: string;
    difficulty: "0" | "1" | "2" | "3" | "4" | "5";
}

export interface Task {
    displayText: string;
    referenceId: string;
    category: Category;
}

export interface Challenge {
    text: string;
    id: string;
    questRequirements: string[];
    tier: number;
}

export type Category = 'Item' | 'Quest' | 'Diary' | 'Clue' | 'Challenge' | 'Pet' | 'ClueTier';

export interface WheelData {
    completedTasks: Task[];
    currentOptions: Task[];
    currentTier: number;
    currentTask?: Task;
    angle?: number;
    uploadTime: number;
}

export interface Pet {
    name: string;
    altOption: string;
    image: string;
    passive?: boolean;
    weight?: number;
}

export interface Mission {
    item: Item;
    time: number;
}

export interface CompletedMission {
    mission: Mission,
    success: boolean
}
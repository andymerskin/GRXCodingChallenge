import { generateIds, createTreeState } from "./utils";
import data from "./data.json";

const dataWithIds = generateIds(data);
const dataWithTreeState = createTreeState(dataWithIds);

export default dataWithTreeState;

import { createContext } from "react";
import { Unit } from "../models/Unit";


export const UnitContext = createContext<Unit[]>([]);
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LocationGeocodedAddress, LocationObject } from "expo-location";

export interface SampleDataProps {
    id: string,
    title: string,
    description: string,
    fullDate: Date,
    date: string,
    time: string,
    location: LocationObject,
    geocode: LocationGeocodedAddress[],
    sample: string,
    uri: string,
    base64: string,
    width: number;
    height: number;
}

export interface CurveDataProps {
    id: string,
    title: string,
    description: string,
    fullDate: Date,
    date: string,
    time: string,
    location: LocationObject,
    geocode: LocationGeocodedAddress[],
    sample: string,
    uri: [],
    base64: [],
    width: number;
    height: number;
}

export interface WSSampleDataProps {
    id: string,
    title: string,
    description: string,
    fullDate: Date,
    date: string,
    time: string,
    location: LocationObject,
    geocode: LocationGeocodedAddress[],
    sample: string,
    uri: string,
    base64: string,
    width: number;
    height: number;
}

export interface StorageDataProps {
    [id: string]: {
        data: SampleDataProps | CurveDataProps | WSSampleDataProps,
    }
}

export interface PartialInfoProps {
    mode: string,
    image: string,
    arrayImage: [],
    base: string,
    arrayBase: [],
    imageHeight: number,
    imageWidth: number,
}

export interface SettingsProps {
    RGB: boolean,
    RGBTriple: boolean,
    CMYK: boolean,
    HSV: boolean,

    SampleNumber: number,
    ReplicatesNumber: number,
    ReplicatesFirst: boolean,

    imageSizeVector: number,
    imageSizeBigVector: number,
    handleAllowImageClickable: boolean,
}

export async function loadSampleData(): Promise<SampleDataProps[]> {
    try {
        const data = await AsyncStorage.getItem("@dataSample");
        const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

        const dataSorted = Object.keys(allData)
            .map((id) => {
                return {
                    ...allData[id].data as SampleDataProps
                }
            })
            .sort((a, b) => Number(b.id) - Number(a.id))

        return dataSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function loadCurveData(): Promise<CurveDataProps[]> {
    try {
        const data = await AsyncStorage.getItem("@dataCurve");
        const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

        const dataSorted = Object.keys(allData)
            .map((id) => {
                return {
                    ...allData[id].data as CurveDataProps
                }
            })
            .sort((a, b) => Number(b.id) - Number(a.id))

        return dataSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function loadWSSampleData(): Promise<WSSampleDataProps[]> {
    try {
        const data = await AsyncStorage.getItem("@dataWS");
        const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

        const dataSorted = Object.keys(allData)
            .map((id) => {
                return {
                    ...allData[id].data as WSSampleDataProps
                }
            })
            .sort((a, b) => Number(b.id) - Number(a.id))

        return dataSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removeSampleData(id: string): Promise<void> {
    const data = await AsyncStorage.getItem("@dataSample");
    const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

    delete allData[id];

    await AsyncStorage.setItem("@dataSample", JSON.stringify(allData));
}

export async function removeCurveData(id: string): Promise<void> {
    const data = await AsyncStorage.getItem("@dataCurve");
    const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

    delete allData[id];

    await AsyncStorage.setItem("@dataCurve", JSON.stringify(allData));
}

export async function removeWSSampleData(id: string): Promise<void> {
    const data = await AsyncStorage.getItem("@dataWS");
    const allData = data ? (JSON.parse(data) as StorageDataProps) : {};

    delete allData[id];

    await AsyncStorage.setItem("@dataWS", JSON.stringify(allData));
}
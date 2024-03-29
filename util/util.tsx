import Icon from "react-native-vector-icons/Ionicons";

/** Pump variable id, name and type */
export const CODES = [
    {name: "Compressor  0W", code: "1A01", valueType: "Status"},
    {name: "Add heat step 1  0W", code: "1A02", valueType: "Status"},
    {name: "Add heat step 2  0W", code: "1A03", valueType: "Status"},
    {name: "Pump Cold circuit  0W", code: "1A04", valueType: "Status"},
    {name: "Pump Heat circuit  0W", code: "1A05", valueType: "Status"},
    {name: "Pump Radiator  0W", code: "1A06", valueType: "Status"},
    {name: "Switch valve 1  0W", code: "1A07", valueType: "Status"},
    {name: "Alarm  0W", code: "1A20", valueType: "Status"},
    {name: "Radiator Return", code: "0001", valueType: "Temp Sensor"},
    {name: "Radiator Forward", code: "0002", valueType: "Temp Sensor"},
    {name: "Heat carrier Return", code: "0003", valueType: "Temp Sensor"},
    {name: "Heat carrier Forwrd", code: "0004", valueType: "Temp Sensor"},
    {name: "Brine in/Evaporator", code: "0005", valueType: "Temp Sensor"},
    {name: "Brine out/Condenser", code: "0006", valueType: "Temp Sensor"},
    {name: "Outdoor", code: "0007", valueType: "Temp Sensor"},
    {name: "Indoor", code: "0008", valueType: "Temp Sensor"},
    {name: "Warm water 1 / Top", code: "0009", valueType: "Temp Sensor"},
    {name: "Warm water 2 / Mid", code: "000A", valueType: "Temp Sensor"},
    {name: "Hot gas / Compr.", code: "000B", valueType: "Temp Sensor"},
    {name: "Add heat status  0W", code: "3104", valueType: "Percent usage"},
    {name: "Heating setpoint", code: "0107", valueType: "Temp variable"},
    {name: "Warm water setpoint", code: "0111", valueType: "Temp variable"},
    {name: "Room temp setpoint", code: "0203", valueType: "Set temp"},
    {name: "Room sensor influence", code: "2204", valueType: "Set temp"},
    {name: "Heat set 1", code: "2205", valueType: "Set number"},
    {name: "Heat set 3", code: "0207", valueType: "Set number"},
    {name: "Warm Water stop temp", code: "0208", valueType: "Set temp"},
    {name: "Warm water Difference", code: "020B", valueType: "Set temp"},
    {name: "Extra Warm Water", code: "7209", valueType: "Set Minutes"},
    {name: "Elect. heater switch", code: "1215", valueType: "Set Status"},
    {name: "External control", code: "1233", valueType: "Set Status"},
    {name: "Summer mode", code: "020A", valueType: "Set temp"},
    {name: "Holiday mode", code: "2210", valueType: "Set Hour"},
    {name: "Alarm Code", code: "BA91", valueType: "Number"},
    {name: "Compr. cons. heating", code: "6C55", valueType: "Time Hours"},
    {name: "Compr. cons. hotwat", code: "6C56", valueType: "Time Hours"},
    {name: "Aux cons. heating", code: "6C58", valueType: "Time Hours"},
    {name: "Aux cons. hot water", code: "6C59", valueType: "Time Hours"}
]

/** Values to use while no access to pump api (wifi) */
export const OFFLINEDATA = {
    "0001": 224, "0002": -483, "0003": 224, "0004": 224, "0005": 63, "0006": 76, "0007": -26, "0008": -483, "0009": -483, "000A": 482, "000B": 315, "3104": 0, "0107": 225, "0111": 480, "0203": 200, "2204": 50, "2205": 19, "0207": 6, "0208": 480, "020B": 40, "7209": 0, "1215": 1, "1233": 0, "020A": 250, "2210": 0, "1A01": 0, "1A02": 0, "1A03": 0, "1A04": 0, "1A05": 1, "1A06": 1, "1A07": 0, "1A20": 0, "BA91": 210, "6C55": 0, "6C56": 107260, "6C58": 11930, "6C59": 2020
}

//Found in CODES valueType
/**Return all pump varible names that match the variable type (set/get) such as Temp variable, Time Hours, Set number etc */
export const getKeywords = (keyword: 'set'|'get') => {
    const dupes: string[] = []
    const keywords = CODES.filter(code => {
        if (keyword === 'set') return code.valueType.includes('Set ')
        else return !code.valueType.includes('Set ')
    }).map(code => code.valueType).filter(keyword => {
        if (dupes.includes(keyword)) {
            return false
        }
        dupes.push(keyword)
        return true
    })
    return keywords
}

export const getValue = (value: number, keyword: string) => {
    switch (keyword) {
        case 'Status':
            return value === 0 ? 'OFF' : 'ON'
        case 'Percent usage':
            return value + '%'
        case 'Temp variable':
            return (value / 10).toFixed(2) + ' °C'
        case 'Number':
            return value
        case 'Time Hours':
            return value + ' h'
        case 'Set number':
            return (value/10).toFixed(2)
        case 'Set Minutes':
            return value + ' min'
        case 'Set Status':
            return value === 0 ? 'OFF' : 'ON'
        case 'Set Hour':
            return value + ' h'
        case 'Temp Sensor':
            return (value / 10).toFixed(2) + ' °C'
        case 'Set temp':
            return (value / 10).toFixed(2) + ' °C'
        default:
            return value + ' raw value'
    }
}

export const getFrontPageValue = (name: string, value: number, keyword: string, compressor = 0) => {
    if (name === 'Heat set 1' || name === 'Radiator Return') return getValue(value, keyword)
    else if (name === 'Heating setpoint') {
        return compressor === 0 ? getValue(value - 25, keyword): getValue(value + 25, keyword)
    }
    else if (name === 'Alarm  0W') return 'No alarms'
    else return <Icon name={value === 0 ? 'pause' : 'play'} size={30} color={value === 0 ? 'red' : 'green'} />
}
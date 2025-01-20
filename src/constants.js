export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
import { filter, map, sortBy, toLower, uniqBy } from "lodash";
import MajesticRawData from "./platforms-majestic.json";

import { onlyAlphanumeric } from "./utils";

export const platformCoordinates = [
    {
        "platform": "29B",
        "coordinates": [
            77.571546,
            12.978017
        ]
    },
    {
        "platform": "19",
        "coordinates": [
            77.571433,
            12.977914
        ]
    },
    {
        "platform": "20",
        "coordinates": [
            77.57185540812151,
            12.978442427047693
        ]
    },
    {
        "platform": "19D",
        "coordinates": [
            77.571685,
            12.978305
        ]
    },
    {
        "platform": "28",
        "coordinates": [
            77.571784,
            12.978324
        ]
    },
    {
        "platform": "28A",
        "coordinates": [
            77.57172,
            12.97826
        ]
    },
    {
        "platform": "29",
        "coordinates": [
            77.57161834984568,
            12.97813301274626
        ]
    },
    {
        "platform": "19B",
        "coordinates": [
            77.57155,
            12.978147
        ]
    },
    {
        "platform": "19A",
        "coordinates": [
            77.571491,
            12.978043
        ]
    },
    {
        "platform": "19E",
        "coordinates": [
            77.57173985301745,
            12.978368104155848
        ]
    },
    {
        "platform": "29A",
        "coordinates": [
            77.57151361222678,
            12.977956466694335
        ]
    },
    {
        "platform": "29C",
        "coordinates": [
            77.571484,
            12.977902
        ]
    },
    {
        "platform": "1",
        "coordinates": [
            77.572829,
            12.977732
        ]
    },
    {
        "platform": "2",
        "coordinates": [
            77.572687,
            12.977939
        ]
    },
    {
        "platform": "3",
        "coordinates": [
            77.572486,
            12.978041
        ]
    },
    {
        "platform": "3A",
        "coordinates": [
            77.572273,
            12.978054
        ]
    },
    {
        "platform": "4",
        "coordinates": [
            77.572105,
            12.977986
        ]
    },
    {
        "platform": "4A",
        "coordinates": [
            77.571969,
            12.977848
        ]
    },
    {
        "platform": "4B",
        "coordinates": [
            77.571908,
            12.977703
        ]
    },
    {
        "platform": "5",
        "coordinates": [
            77.571837,
            12.977804
        ]
    },
    {
        "platform": "6",
        "coordinates": [
            77.571922,
            12.977935
        ]
    },
    {
        "platform": "6A",
        "coordinates": [
            77.572038,
            12.978042
        ]
    },
    {
        "platform": "7",
        "coordinates": [
            77.572159,
            12.978113
        ]
    },
    {
        "platform": "8",
        "coordinates": [
            77.572326,
            12.978144
        ]
    },
    {
        "platform": "8A",
        "coordinates": [
            77.572462,
            12.978144
        ]
    },
    {
        "platform": "8B",
        "coordinates": [
            77.572632,
            12.978095
        ]
    },
    {
        "platform": "9",
        "coordinates": [
            77.572806,
            12.977988
        ]
    },
    {
        "platform": "10",
        "coordinates": [
            77.572925,
            12.977775
        ]
    },
    {
        "platform": "14",
        "coordinates": [
            77.572446,
            12.978294
        ]
    },
    {
        "platform": "13",
        "coordinates": [
            77.572543,
            12.978275
        ]
    },
    {
        "platform": "12A",
        "coordinates": [
            77.572653,
            12.978244
        ]
    },
    {
        "platform": "12",
        "coordinates": [
            77.57276,
            12.97819
        ]
    },
    {
        "platform": "11C",
        "coordinates": [
            77.572863,
            12.978114
        ]
    },
    {
        "platform": "11B",
        "coordinates": [
            77.57296,
            12.978012
        ]
    },
    {
        "platform": "11A",
        "coordinates": [
            77.573017,
            12.97791
        ]
    },
    {
        "platform": "11",
        "coordinates": [
            77.573074,
            12.977793
        ]
    },
    {
        "platform": "15",
        "coordinates": [
            77.57232,
            12.978299
        ]
    },
    {
        "platform": "15A",
        "coordinates": [
            77.572201,
            12.978273
        ]
    },
    {
        "platform": "16",
        "coordinates": [
            77.572084,
            12.978237
        ]
    },
    {
        "platform": "17",
        "coordinates": [
            77.571967,
            12.978177
        ]
    },
    {
        "platform": "17A",
        "coordinates": [
            77.571858,
            12.978085
        ]
    },
    {
        "platform": "18",
        "coordinates": [
            77.571761,
            12.977969
        ]
    },
    {
        "platform": "18A",
        "coordinates": [
            77.571697,
            12.977834
        ]
    },
    {
        "platform": "23D",
        "coordinates": [
            77.573328,
            12.977845
        ]
    },
    {
        "platform": "23C",
        "coordinates": [
            77.573269,
            12.977978
        ]
    },
    {
        "platform": "24",
        "coordinates": [
            77.573205,
            12.977981
        ]
    },
    {
        "platform": "23B",
        "coordinates": [
            77.573218,
            12.978114
        ]
    },
    {
        "platform": "23A",
        "coordinates": [
            77.573102,
            12.978253
        ]
    },
    {
        "platform": "25",
        "coordinates": [
            77.573083,
            12.978183
        ]
    },
    {
        "platform": "25A",
        "coordinates": [
            77.572966,
            12.978315
        ]
    },
    {
        "platform": "23",
        "coordinates": [
            77.573003,
            12.978355
        ]
    },
    {
        "platform": "25B",
        "coordinates": [
            77.572783,
            12.978424
        ]
    },
    {
        "platform": "22A",
        "coordinates": [
            77.572804,
            12.978469
        ]
    },
    {
        "platform": "25C",
        "coordinates": [
            77.572582,
            12.978488
        ]
    },
    {
        "platform": "22",
        "coordinates": [
            77.572579,
            12.978541
        ]
    },
    {
        "platform": "26",
        "coordinates": [
            77.572281,
            12.978522
        ]
    },
    {
        "platform": "21",
        "coordinates": [
            77.572249,
            12.978567
        ]
    },
    {
        "platform": "26A",
        "coordinates": [
            77.572142,
            12.978493
        ]
    },
    {
        "platform": "20B",
        "coordinates": [
            77.572098,
            12.978533
        ]
    },
    {
        "platform": "27",
        "coordinates": [
            77.571993,
            12.978445
        ]
    },
    {
        "platform": "20A",
        "coordinates": [
            77.571942,
            12.978477
        ]
    },
    {
        "platform": "27A",
        "coordinates": [
            77.571873,
            12.978381
        ]
    },
    {
        "platform": "19C",
        "coordinates": [
            77.571614,
            12.978235
        ]
    },
    {
        "platform": "30",
        "coordinates": [
            77.572579,
            12.977537
        ]
    },
    {
        "platform": "19F",
        "coordinates": [
            77.57179067484697,
            12.978414756799978
        ]
    }
];


export const MajesticData = sortBy(
    map(
        filter(uniqBy(MajesticRawData.Received, "route-number"), p => !!p["platform-number"]),
        p => ({
        ...p,
        searchText: toLower(
            `${onlyAlphanumeric(p["route-number"])}-${onlyAlphanumeric(p["start-station"])}-${onlyAlphanumeric(p["to-station"])}`
        )
    }))
    , "route-number");
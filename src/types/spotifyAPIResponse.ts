export interface resonse {
    href: string;
    // items: item[];
    limit: number;
    next: null | string;
    offset: number;
    previous: null | string;
    total: number;
}

export type external_urls = { spotify: string };
export type images = { height: number; url: string; width: number };

export interface owner {
    display_name: string;
    external_urls: external_urls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface followers {
    href: null | string;
    total: number;
}

export type genres = string[];

export type available_markets = [
    "AD",
    "AE",
    "AR",
    "AT",
    "AU",
    "BE",
    "BG",
    "BH",
    "BO",
    "BR",
    "CA",
    "CH",
    "CL",
    "CO",
    "CR",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "GT",
    "HK",
    "HN",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IS",
    "IT",
    "JO",
    "JP",
    "KW",
    "LB",
    "LI",
    "LT",
    "LU",
    "LV",
    "MA",
    "MC",
    "MT",
    "MX",
    "MY",
    "NI",
    "NL",
    "NO",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PH",
    "PL",
    "PS",
    "PT",
    "PY",
    "QA",
    "RO",
    "SA",
    "SE",
    "SG",
    "SK",
    "SV",
    "TH",
    "TN",
    "TR",
    "TW",
    "US",
    "UY",
    "VN",
    "ZA"
];

export interface album {
    album_type: "SINGLE" | "ALBUM";
    artists: images[];
    available_markets: available_markets;
    external_urls: external_urls;
    href: string;
    id: string;
    images: images[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "day";
    total_tracks: number;
    type: "album";
    uri: string;
}

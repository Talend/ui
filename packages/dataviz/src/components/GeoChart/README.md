## Choropleth map component

The map config has to be provided in the props.

Map config fields are:
- `topology`: a topoJSON `Topology` object, it has to be pre-projected (see commands used for FR/CA maps bellow)
- `labelProperty`: a `properties` field to be used as tooltip label (example: `Texas (TX): 50`),
- `layer`: the topoJSON collection name (if needed),
- `valueProperties`: topoJSON fields matching semantic type

Matching between map features and provided data:
- is done on all fields
- is ignoring case, special chars and punctuation


To use the maps generated, you can use [this helper file](GeoChart.utils.ts).

Maps are extracted from http://naturalearthdata.com/ data using https://mapshaper.org/ online and cli tools, you can rebuild them with the following commands:

```
wget https://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_1_states_provinces.zip
unzip ne_10m_admin_1_states_provinces.zip

npx mapshaper ne_10m_admin_1_states_provinces.shp \
    -filter '"US".indexOf(iso_a2) > -1' \
    -filter-fields name,name_fr,name_en,iso_3166_2 \
    -each 'iso_3166_2=iso_3166_2.split("-")[1]' \
    -simplify 15% keep-shapes \
    -proj albersusa \
    -o force US.topo.json format=topojson width=300 height=250

npx mapshaper ne_10m_admin_1_states_provinces.shp \
    -filter '"FR".indexOf(iso_a2) > -1' \
    -each "name=(name === 'Guyane française' ? 'Guyane' : name)" \
    -each "region=(region === 'Guyane française' ? 'Guyane' : region)" \
    -each "name=(name === 'Réunion' ? 'La Réunion' : name)" \
    -each "region=(region === 'Réunion' ? 'La Réunion' : region)" \
    -each "region_legacy=region" \
    -each "region={'Centre': 'Centre-Val de Loire', Alsace: 'Grand Est', 'Champagne-Ardenne': 'Grand Est', Lorraine: 'Grand Est', Aquitaine: 'Nouvelle-Aquitaine', Limousin: 'Nouvelle-Aquitaine', 'Poitou-Charentes': 'Nouvelle-Aquitaine', Auvergne: 'Auvergne-Rhône-Alpes', 'Rhône-Alpes': 'Auvergne-Rhône-Alpes', Bourgogne: 'Bourgogne-Franche-Comté', 'Franche-Comté': 'Bourgogne-Franche-Comté', 'Languedoc-Roussillon': 'Occitanie', 'Midi-Pyrénées': 'Occitanie', 'Nord-Pas-de-Calais': 'Hauts-de-France', Picardie: 'Hauts-de-France', 'Basse-Normandie': 'Normandie', 'Haute-Normandie': 'Normandie'}[region] || region" \
    -proj crs=epsg:3857 \
    -affine where="gn_a1_code.indexOf('FR.971')==0" shift=6355000,3330000 scale=1.5 \
    -affine where="gn_a1_code.indexOf('FR.972')==0" shift=6480000,3505000 scale=1.5 \
    -affine where="gn_a1_code.indexOf('FR.973')==0" shift=5760000,4720000 scale=0.35 \
    -affine where="gn_a1_code.indexOf('FR.974')==0" shift=-6170000,7560000 scale=1.5 \
    -affine where="gn_a1_code.indexOf('FR.976')==0" shift=-4885000,6590000 scale=1.5 \
    -filter-fields name,name_fr,name_en,region,region_legacy \
    -simplify 15% keep-shapes \
    -dissolve region + name=regions \
    -target 1 \
    -dissolve region_legacy + name=regions_legacy \
    -o target="*" FR.topo.json format=topojson width=300 height=250

npx mapshaper ne_10m_admin_1_states_provinces.shp \
    -filter '"MX".indexOf(iso_a2) > -1' \
    -filter-fields name,name_fr,name_en,iso_3166_2 \
    -each 'iso_3166_2=iso_3166_2.split("-")[1]' \
    -simplify 20% keep-shapes \
    -o MX.topo.json format=topojson width=300 height=250

npx mapshaper ne_10m_admin_1_states_provinces.shp \
    -filter '"CA".indexOf(iso_a2) > -1' \
    -filter-fields name,name_fr,name_en,iso_3166_2 \
    -each 'iso_3166_2=iso_3166_2.split("-")[1]' \
    -simplify 15% keep-shapes \
    -proj ESRI:102002 \
    -o CA.topo.json format=topojson width=300 height=250

npx mapshaper ne_10m_admin_1_states_provinces.shp \
    -filter '["US", "CA"].includes(iso_a2)' \
    -filter-fields name,name_fr,name_en,iso_3166_2 \
    -each 'iso_3166_2=iso_3166_2.split("-")[1]' \
    -simplify 10% keep-shapes \
    -proj ESRI:102009 \
    -o US_CA.topo.json format=topojson width=300 height=250

rm ne_10m_admin_1_states_provinces*

wget https://naciscdn.org/naturalearth/50m/cultural/ne_50m_admin_0_countries.zip
unzip ne_50m_admin_0_countries.zip

npx mapshaper ne_50m_admin_0_countries.shp \
    -each 'iso_a2=(ISO_A2 === "-99" ? WB_A2 : ISO_A2)' \
    -each 'iso_a3=(ISO_A3 === "-99" ? WB_A3: ISO_A3)' \
    -each 'iso_a2=(NAME === "Norway" ? "NO" : iso_a2)' \
    -each 'iso_a3=(NAME === "Norway" ? "NOR" : iso_a3)' \
    -each name=NAME \
    -each name_fr=NAME_FR \
    -each name_en=NAME_EN \
    -filter-fields name,name_fr,name_en,iso_a2,iso_a3 \
    -simplify 7% keep-shapes \
    -proj EPSG:32662 \
    -o  world.topo.json format=topojson width=300 height=250
rm ne_50m_admin_0_countries*

#see https://data.opendatasoft.com/explore/dataset/continents-of-the-world%40public
curl -JLO https://data.opendatasoft.com/explore/dataset/continents-of-the-world@public/download/\?format\=geojson
npx mapshaper continents-of-the-world.geojson \
    -clean \
    -each "continent = continent == 'Australia' ? 'Oceania' : continent" \
    -dissolve continent \
    -filter-fields continent \
    -each "code={'North America': 'NAM', 'South America': 'SAM', 'Africa': 'AFR', 'Europe': 'EUR', 'Asia': 'ASI', 'Oceania': 'OCE', 'Antarctica': 'ANT'}[continent]" \
    -each "continent_fr={'North America': 'Amérique du Nord', 'South America': 'Amérique du Sud', 'Africa': 'Afrique', 'Europe': 'Europe', 'Asia': 'Asie', 'Oceania': 'Océanie', 'Antarctica': 'Antarctique'}[continent]" \
    -simplify 5% keep-shapes \
    -proj EPSG:32662 \
    -o continents.topo.json format=topojson width=300 height=250
rm continents-of-the-world.geojson
```

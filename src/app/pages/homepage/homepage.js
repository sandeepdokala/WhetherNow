import { useState, useEffect } from "react";
import "./homepage.css";
import Hourly from "src/app/components/Hourly/Hourly.js"
import FeaturedCard from "@/app/components/featuredcard/featuredcard";
import SearchSection from "@/app/components/searchbox/searchbox";
import DailyForecast from "@/app/components/dailyforecast/dailyforecast";
import ForecastDetails from "@/app/components/forecastdetails/forecastdetails";

export default function HomePage(props) {

    const [weatherCode, changeWeatherCode] = useState(null);
    const setWeatherCode = (code) => {
        props.setWeatherCode(code);
        changeWeatherCode(code);
    }

    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    // const getLocation = () => {
        
    //     useEffect(() => {
    //         // Check if browser supports geolocation
    //         if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //             setLatitude(position.coords.latitude);
    //             setLongitude(position.coords.longitude);
    //             },
    //             (error) => {
    //             console.log(error.message);
    //             }
    //         );
    //         } else {
    //         console.log('Geolocation is not supported by this browser.');
    //         }
    //     }, []);
    // }
    // getLocation();
    

    // console.log(latitude);
    // console.log(longitude);

    const [tmmp,setTmmp]=useState([]);
    const [time,setTime]=useState([]);
    const [code,setCode]=useState([]);
    
    const [rain,setRain]=useState(null);
    const [minTemp,setMinTemp]=useState(null);
    const [maxTemp,setMaxTemp]=useState(null);
    const [sunrise,setSunrise]=useState(null);
    const [sunset,setSunset]=useState(null);

    // const [lat,setLat]=useState(null);
    // const [long,setLong]=useState(null);

    const get_data=async (p1,p2,humid,press,fell_like,weather) => {
        // console.log(p1,p2);
        const tUrl=`https://api.open-meteo.com/v1/forecast?latitude=${p1}&longitude=${p2}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,weathercode,sunrise,sunset,windspeed_10m_max,uv_index_max&timezone=auto`;
        const object=await fetch(tUrl);
        // console.log("data fetch done");
        // console.log(object);
        const dict=await object.json();
        const data=dict["daily"];
        const temp=data["temperature_2m_max"];
        const time=data["time"];
        const code=data["weathercode"];
        const wspeed=data["windspeed_10m_max"];
        const rain=data["precipitation_probability_mean"][0];
        const mini=data["temperature_2m_min"][0];
        const maxi=data["temperature_2m_max"][0];
        const rise=data["sunrise"][0];
        const set=data["sunset"][0];
        featue_relpy(temp[0],code[0],fell_like,press,humid,wspeed[0],time[0],weather);
        setTmmp(temp);
        setTime(time);
        setCode(code);
        setRain(rain);
        setMinTemp(mini);
        setMaxTemp(maxi);
        setSunrise(rise);
        setSunset(set);
        // console.log(wspeed);
    }
    
    
    const [temp,setTemp]=useState(null);
    const [wecode,setWecode]=useState(null);
    const [fell_like,setFell_like]=useState(null);
    const [pressure,setPressure]=useState(null);
    const [humidity,setHumidity]=useState(null);
    const [wind,setWind]=useState(null);   
    const [ftime,setFtime]=useState(null);  
    const [weather, setWeather]=useState(null);
    const [currentTime, setCurretTime] = useState(null);

    const featue_relpy= async(temp,wecode,fell_like,pressure,humidity,wind,time,weather) =>{
        setTemp(temp);
        setWecode(wecode);
        setFell_like(fell_like);
        setPressure(pressure);
        setHumidity(humidity);
        setWind(wind);
        setFtime(time);
        setWeather(weather);
    }
    
    const getcoord=async (p) => {
        // console.log(p);
        // balu: 74fbf5bd6a251dec081a84f838a52c1e
        // boghi: 967ea2ee066696f316d6a84ed7e3f80f
        // sandeep: a222156cbebb29be7542966ade9391cb
        // sandeep2: 459a66ccbc83d8c55865d4c8b6a0ef74
        // sandeep3: bca550a11189e3431d97b0625176bb0d
        const tUrl=`https://api.openweathermap.org/data/2.5/find?q=${p}&units=metric&type=accurate&mode=json&APPID=bca550a11189e3431d97b0625176bb0d`;
        const object=await fetch(tUrl);
        // console.log("data fetch done");
        // console.log(object);
        const dict=await object.json();
        // console.log(dict["list"]["0"]);
        const weather = dict["list"]["0"]["weather"]['0']["main"];
        const lat=dict["list"]["0"]["coord"]["lat"];
        const long=dict["list"]["0"]["coord"]["lon"];
        const dt = dict.list[0].dt;
        // console.log(dt);
        // const currentDate = new Date((dt + 530) + 1000).toLocaleString();
        // console.log(currentDate);
        const currentTimestamp = Date.now(); // Get the current timestamp
        const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
        const targetTimestamp = currentTimestamp + timeZoneOffset + (long * 4 * 60 * 1000) + (lat * 2 * 60 * 1000);
        const targetDate = new Date(targetTimestamp);
        const currentTime = String(targetDate.toLocaleString()).slice(9, -6) + " " + String(targetDate.toLocaleString()).slice(-2,);
        // console.log(currentTime);
        const humid=dict["list"]["0"]["main"]["humidity"];
        const pressure=dict["list"]["0"]["main"]["pressure"];
        const win_spd=dict["list"]["0"]["wind"]["speed"];
        const fell_like=dict["list"]["0"]["main"]["feels_like"];
        get_data(lat,long,humid,pressure,fell_like, weather);
        getHourlyData(lat,long);
        setWeatherCode(dict["list"]["0"]["weather"]['0']["icon"]);
        setCurretTime(currentTime);
    }

    const [hour,setHour]=useState([]);
    const [temperature,setTemperature]=useState([]);
    const [rainfall,setRainfall]=useState([]);
    const [windSpeed,setWindSpeed]=useState([]);

    const [G,setG]=useState(null);

    const getHourlyData=async(lat,long)=>{
        // console.log(lat,long);
        const Obj=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,windspeed_10m,precipitation_probability,weathercode`);
        const D=await Obj.json();
        console.log(D);
        const hour=D["hourly"]["time"];
        const temperature=D["hourly"]["temperature_2m"];
        const rainfall=D["hourly"]["precipitation_probability"];
        const windSpeed=D["hourly"]["windspeed_10m"];
        setHour(hour);
        setTemperature(temperature);
        setRainfall(rainfall);
        setWindSpeed(windSpeed);
    }
    // console.log(hour);

    const catchClickDate = (p) => {
        // setDate(date);
        // console.log(date);
        setG(p*24)
        // const element = document.getElementById(date + "T03:00");
        // if (element) {
        //     element.scrollIntoView({ behavior: 'smooth' });
        // }
    } 

    // console.log(G);

    const [featureData, setFeatureData] = useState([]);

    const getSearchData = (val) => {
        setFeatureData(val);
        getcoord(val[0]);
    }
    var arr2=[];
    for(var i=0;i<7;i++){
        arr2.push(i);
    }

    var arr1=[];
    for(var i=G;i<G+24;i++){
        arr1.push(i);
    }

    const s = new Date();
    const today = s.toISOString().split('T')[0];
    const [selectedDate, setDate] = useState(today);

    const [displayBool, setDisplayBool] = useState(false);

    const setBool = (bool) => {
        setDisplayBool(bool);
    }
    
    const onSearchContent = (bool) => {
        // const bool = true;
        if (bool) {
            return(
                <div className="on-search-content">
                    <div className="featurecard-wrapper">
                        <FeaturedCard featureData={featureData} currentTime={currentTime} icon={weatherCode} temp={temp} wecode={wecode} weather={weather} time={ftime} fell_like={fell_like} pressure={pressure} humidity={humidity} wind={wind}></FeaturedCard>
                    </div>
                    <div className="forecast-section">
                        <div className="forecast-wrapper">
                            <div className="daily-forecast-wrapper">
    
                                {arr2.map((val,index)=>{
                                    return <DailyForecast key={index} temp={tmmp[val]} time={time[val]} code={code[val]} catchClickDate={catchClickDate} i={val} ></DailyForecast>
                                })}
                            </div>
    
                            <div className="hourly-forecast-wrapper">
                            {
                                arr1.map((val1,index)=>{
                                    return <Hourly temperature_2m={temperature[val1]} tt={hour[index]} rainfall={rainfall[val1]} wind={windSpeed[val1]} key={index}></Hourly>  
                                })
                            }
                            </div>
                        </div>
                        <div className="forecast-more-details">
                            <ForecastDetails Max={maxTemp} Min={minTemp} rain={rain} rise={sunrise} set={sunset} Temp={temp} fell_like={fell_like} weather={weather} ></ForecastDetails>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    // console.log(G)

    const keyInput=(p)=>{
        getcoord(p);
    }

    return(
        <div className="container">
            {/* <button onClick={sample}>Clickme</button> */}
            <div className="search-section-wrapper">
                <SearchSection getSearchData={getSearchData} setBool={setBool} keyInput={keyInput}></SearchSection>
            </div>
            {onSearchContent(displayBool)}
        </div>
        
    )
}
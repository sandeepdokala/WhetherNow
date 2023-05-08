import "./hourlyforecast.css";

export default function HourlyFunction(props) {
    console.log(props.val1)

    return (
        <div className="hourly-content">
            <div className="text">
                <h4>0</h4>
            </div>
            <div className="side">
                <h3>33<sup><sup>o</sup>C</sup></h3>
                <img src="/icons/sun-48.png" alt="React Logo" className="img" />
            </div>
            <div className="hum-wind">
                <img src="/icons/sun-48.png" alt="React Logo" className="img" />
                <img src="/icons/sun-48.png" alt="React Logo" className="img" />
            </div>
        </div>
    )
}
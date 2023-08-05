import React from "react";
import { Link } from "react-router-dom";
import "../css/error.css"

function ErrorPage() {
  return (
 <div style={{

 }}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 div ">
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }} class="col-sm-12 col-sm-offset-1  text-center">
              <div
                className="four_zero_four_bg"
                style={{
                  backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                  height: "500px",
                  width: "80%",
                  backgroundPosition: "center",
                }}
              ></div>

              <div class="contant_box_404">
                <h3 class="h2" style={{fontSize:"30px"}}>Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>
                <p>please try again</p>

                <Link to="/" class="link_404" 
                style={{color:"white",
                padding:"10px 20px",
                background:"#0d6efd",
                margin:"20px 0px",
                display:"inline-block"}}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
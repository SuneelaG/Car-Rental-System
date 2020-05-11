import React, { Component } from "react";
import { Link } from "react-router-dom";

type Props= {
  isActive:boolean,
  path:string,
  text:string
}

export const Navlink: React.FC<Props> = props => {
    return (
      <li className={"nav-item " + (props.isActive ? "active": "")}>
                <Link 
                  className="nav-link" 
                  to={props.path}
                  //onClick={() => this.props.onClick()}
                >
            {props.text}</Link>
      </li>
    );

}

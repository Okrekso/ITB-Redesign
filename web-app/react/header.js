import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {goTo} from '../js/modules/main';
import getAccessLevel from '../js/modules/accessLevel';

export class Header extends Component {
  constructor(props) {
    super(props)
  }
  	AccountButton(){
		  let level=getAccessLevel();
		  if(level!=-1) return(
			<button id="bAccount" onClick={(e)=>goTo('/account/')}>
				<p>Account</p>
				<img id="mobile" src="/pics/avatar.png" />
			</button>
		  );
		  else return <></>;
	  }
	render() {
		return (
			<>
				<h1 onClick={(e)=>{goTo('/')}}>
					<span id="full">IT B.E.A.N.S.</span>
					<span id="mobile">ITB</span>
				</h1>
				<div id="buttonTab">
					<div id="clubSelectionTotal">
						<button id="bClubSelect">
							<p>Clubs</p>
						</button>
						<div id="clubSelectGroup">
							<div className="itm" id="global" onClick={(e)=>goTo('/code/')}>
								<div id="image" />
								<p>programming</p>
							</div>

							<div className="itm" id="design" onClick={(e)=>goTo('/design/')}>
								<div id="image" />
								<p>design</p>
							</div>

							<div className="itm" id="cyber" onClick={(e)=>goTo('/cyberSecurity')}>
								<div id="image" />
								<p>cyber security</p>
							</div>

							<div className="itm" id="space" onClick={(e)=>goTo('/space/')}>
								<div id="image" />
								<p>space</p>
							</div>

							<div className="itm" id="vr" onClick={(e)=>goTo('/vr/')}>
								<div id="image" />
								<p>VR</p>
							</div>

							<div className="itm" id="poker" onClick={(e)=>goTo('/poker/')}>
								<div id="image" />
								<p>poker club</p>
							</div>
						</div>
					</div>
					<button id="bOurEvents" onClick={(e)=>goTo('/events/')}>
						<p>Events</p>
						<img id="mobile" src="/pics/other.png" />
					</button>
					<this.AccountButton/>
				</div>
			</>
		);
	}
}
export default function renderHeader() {
	let element = $('header').get(0);
	ReactDOM.render(<Header />, element);
}

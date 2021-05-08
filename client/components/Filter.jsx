import React from 'react';
import { connect } from 'react-redux';
import './styles/Filter.css';
import Search from './Search';
import { Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.hideFilter = this.hideFilter.bind(this);
  }
  hideFilter(ev) {
    console.dir(ev.target);
    const collapsibleBody = ev.target.nextSibling;
    if (collapsibleBody.className.includes('hide')) {
      collapsibleBody.className = collapsibleBody.className
        .split(' ')
        .filter((className) => className !== 'hide')
        .join(' ');
    } else {
      collapsibleBody.className = collapsibleBody.className + ' hide';
    }
  }
  render() {
    const { onChange } = this.props;
    return (
      <div className="col s12 m12 l3 filter-card">
        <Search products={this.props.products} search={this.props.search} />
        <Accordion
        // expanded={expanded === 'panel1'}
        // onChange={handleChange('panel1')}
        >
          {/* fix filter styles */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <input
                type="checkbox"
                name="Beanie"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Beanie
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Beret"
                className="filter-checkbox  filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Beret
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Baseball Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Baseball Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Fedora"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Fedora
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Cowboy Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Cowboy Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Fez"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Fez
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Top Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Top Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="Other"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Other
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        // expanded={expanded === 'panel1'}
        // onChange={handleChange('panel1')}
        >
          {/* fix filter styles */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Black"
              />{' '}
              Black
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Brown"
              />{' '}
              Brown
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Red"
              />{' '}
              Red
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Green"
              />{' '}
              Green
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Blue"
              />{' '}
              Blue
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="Other-color"
              />{' '}
              Other
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        // expanded={expanded === 'panel1'}
        // onChange={handleChange('panel1')}
        >
          {/* fix filter styles */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="0, 15"
              />{' '}
              Under $15
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="15, 50"
              />{' '}
              $15 to $50
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="50, null"
              />{' '}
              $50 & Above
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        // expanded={expanded === 'panel1'}
        // onChange={handleChange('panel1')}
        >
          {/* fix filter styles */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Rating</Typography>
          </AccordionSummary>
          <AccordionDetails className="collapsible-filter-menu">
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="5"
              />{' '}
              5 Stars & Above
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="4"
              />{' '}
              4 Stars & Above
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="3"
              />{' '}
              3 Stars & Above
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="2"
              />{' '}
              2 Stars & Above
            </Typography>
            <Typography>
              {' '}
              <input
                className="filter-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="1"
              />{' '}
              1 Star & Above
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* <ul className="collapsible">
      
               
            
                
                  <label htmlFor="0, 15">Under $15</label>
                </li>
                <li>
                 
                  <label htmlFor="15, 50">$15 to $50</label>
                </li>
                <li>
                
                  <label htmlFor="50, null">$50 & Above</label>
                </li>
              </ul>
            </div>
          </li>
        </ul> */}
        <Button variant="contained" onClick={this.props.handleClick}>
          Apply Filters
        </Button>
        <Button variant="contained" onClick={this.props.handleReset}>
          Reset Filters
        </Button>
      </div>
    );
  }
}

export default connect(null)(Filter);

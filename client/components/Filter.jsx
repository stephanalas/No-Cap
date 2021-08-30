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
                name="category-Beanie"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Beanie
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Beret"
                className="filter-checkbox  filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Beret
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Baseball Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Baseball Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Fedora"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Fedora
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Cowboy Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Cowboy Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Fez"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Fez
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Top Hat"
                className="filter-checkbox filled-in"
                defaultChecked={false}
                onChange={onChange}
              />{' '}
              Top Hat
            </Typography>
            <Typography>
              <input
                type="checkbox"
                name="category-Other"
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
                name="color-Black"
              />{' '}
              Black
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="color-Brown"
              />{' '}
              Brown
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="color-Red"
              />{' '}
              Red
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="color-Green"
              />{' '}
              Green
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="color-Blue"
              />{' '}
              Blue
            </Typography>
            <Typography>
              <input
                className="filter-checkbox color"
                type="checkbox"
                defaultChecked={false}
                onChange={onChange}
                name="color-Other"
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
                name="range-0, 15"
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
                name="range-15, 50"
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
                name="range-50, null"
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
                name="rating-5"
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
                name="rating-4"
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
                name="rating-3"
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
                name="rating-2"
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
                name="rating-1"
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

class DetailComponent extends GridDetailRow {
    render() {
        return (
            <Grid data={this.props.dataItem.details}>
                <Column field="productId" title="Product ID" width="120px" />
                <Column field="productName" title="Product Name" />
                <Column field="unitPrice" title="Unit Price" format="{0:c}" />
            </Grid>
        );
    }
}

class GridExample2 extends React.Component {
    baseUrl = `api/products/`;
    init = { method: 'GET', accept: 'application/json', headers: {} };

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.expandChange = this.expandChange.bind(this);
    }

    expandChange(event) {
        let dataItem = event.dataItem;
        dataItem.expanded = !dataItem.expanded;
        this.forceUpdate();
        if (!dataItem.expanded) {
            return;
        }
        fetch(this.baseUrl + `ProductsByCategory/` + dataItem.categoryId, this.init)
            .then(response => response.json())
            .then(json => {
                let data = this.state.categories.slice();
                let index = data.findIndex(d => d.categoryId === dataItem.categoryId);
                data[index].details = json;
                this.setState({ categories: data });
            });
    }

    componentDidMount() {
        fetch(this.baseUrl + `Categories`, this.init)
            .then(response => response.json())
            .then(json => this.setState({ categories: json }));
    }

    render() {
        return (
            <div>
                <Grid
                    style={{ height: '550px' }}
                    data={this.state.categories}
                    detail={DetailComponent}
                    expandField="expanded"
                    expandChange={this.expandChange}
                >
                    <Column field="categoryId" title="ID" width="50px" />
                    <Column field="categoryName" width="200px" title="Category Name" />
                    <Column field="description" />
                </Grid>
            </div>
        );
    }
}


export default GridExample2;

import React, {Component, PropTypes} from 'react';

export default class ConfirmDialog extends Component {
  static propTypes = {
    message: PropTypes.string
  };

  componentDidMount() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    let $el = $('#confirm');
    $el.modal('show');
    $el.find('.btn-primary').focus();
    $el.on('hidden.bs.modal', () => this.reject());
  }

  componentWillUnmount() {
    let $el = $('#confirm');
    $el.modal('hide');
  }

  render() {
    const {message = "Are you sure?"} = this.props;
    return (
      <div id="confirm" className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.onCancel.bind(this)}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Confirmation</h4>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link" onClick={this.onCancel.bind(this)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.onConfirm.bind(this)}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  finished = false;

  onConfirm() {
    if (!this.finished) {
      this.resolve();
      this.finished = true;
    }
  }

  onCancel() {
    if (!this.finished) {
      this.reject();
      this.finished = true;
    }
  }
}
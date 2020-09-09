const Notify = (content, options) => {
    switch (options['type']) {
        case 's':
            options['type'] = 'success';
            break;
        case 'd':
            options['type'] = 'danger';
            break;
        case 'w':
            options['type'] = 'warning';
            break;
        case 'i':
            options['type'] = 'info';
            break;
    }
    switch (options['type']) {
        case 'success':
            content.icon = 'icon ' + 'la la-check-circle';
            break;
        case 'danger':
            content.icon = 'icon ' + 'la la-radiation-alt';
            break;
        case 'warning':
            content.icon = 'icon ' + 'la la-warning';
            break;
        case 'info':
            content.icon = 'icon ' + 'la la-qrcode';
            break;
    }
    return  $.notify(content, {
        type: options['type'],
        allow_dismiss: false,
        newest_on_top: true,
        mouse_over: true,
        showProgressbar: false,
        spacing: 10,
        timer: 1500,
        placement: {
            from: 'top',
            align: 'right'
        },
        offset: {
            x: 30,
            y: 30
        },
        delay: 1000,
        z_index: 10000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
    });
}

export default Notify;

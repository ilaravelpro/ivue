const BaseField = {
    computed: {
        styleForSection() {
            var $style = '';
            if (this.getOption('field.control')) $style += ' form-control';
            if (this.getOption('field.row')) $style += ' row';
            if (this.getOption('field.validate')|| this.statusError === 'invalid') $style += ' validated';
            if (this.getOption('field.relative')) $style += ' position-relative';
            if (this.getStyle('section')) $style += ' ' + this.getStyle('section');
            return $style;
        },
        styleForLabel() {
            var $style = 'text-left col-form-label my-auto ';
            $style += this.getStyle('label') ? this.getStyle('label') : '';
            return $style;
        },
        styleForGroup() {
            var $style = this.getStyle('group') ? this.getStyle('group') : 'my-auto';
            $style = this.label ? $style : 'p-0 my-2';
            return $style;
        },
        statusError() {
            return this.getError((this.getIndex('error') || this.getIndex('store')) + '.status') || null;
        }
    },
    methods: {
        focusin() {
            $.each([this.$refs.icon_prepend, this.$refs.icon_append], function (i, v) {
                if (!$(v).hasClass('border-color-primary'))
                    $(v).addClass('border-color-primary');
                if (!$(v).hasClass('color-primary') && !$(v).find('i').hasClass('cursor-pointer'))
                    $(v).addClass('color-primary');
            })
        },
        focusout() {
            $.each([this.$refs.icon_prepend, this.$refs.icon_append], function (i, v) {
                $(v).removeClass('border-color-primary');
                $(v).removeClass('color-primary');
            })
        }
    }
};

export default BaseField;

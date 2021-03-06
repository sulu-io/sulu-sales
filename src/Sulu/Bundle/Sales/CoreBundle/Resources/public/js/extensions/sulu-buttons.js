(function() {

    'use strict';

    define([], function() {

        return {
            getButtons: function() {
                return [
                    {
                        name: 'transition',
                        template: {
                            id: 'transition',
                            title: 'salescore.transition.title',
                            icon: 'mail-forward'
                        }
                    },
                    {
                        name: 'workflows',
                        template: {
                            id: 'workflows',
                            title: 'workflows.title',
                            icon: 'hand-o-right',
                            iconSize: 'large',
                            dropdownItems: []
                        }
                    }
                ];
            }
        };
    });
})();

const hooks = {
    view_once_media: new ProtobufHook(),
    keep_revoked_messages: new RenderableMessageHook(),
    keep_edited_messages: new EditMessageHook(),
    indicate_sender_os: new HookRendered(),
    special_tags: new HookSendMessage(),
    blue_ticks: new HookReceipts(),
    fullscreen: new FullscreenHook(),
    settings_hook: new SettingsHook()
};

function handle_settings_update() {
    for (const [setting_name, hook] of Object.entries(hooks)) {
        if (active_settings[setting_name] === false) {
            hook.unregister();
        } else {
            hook.register();
        }
    }
}

let active_settings = {};


window.addEventListener('message', function (event) {
    const message = event.data;
    if (message.settings !== undefined) {
        active_settings = message.settings;
        handle_settings_update();
    }
});


const start = async () => {
    initialize_modules();
    for (const [setting_name, hook] of Object.entries(hooks)) {
        if (active_settings[setting_name] !== false) {
            hook.register();
        }
    }
};


console.log('WhatsApp-Plus loaded successfully!');
setTimeout(start, 5000);



Events.on(ClientLoadEvent, () => {
    try{

        let tab = new Table();
        
        tab.bottom().left();
        let overlaymarkerTable = Vars.ui.hudGroup.find("statustable");   
        overlaymarkerTable.row();

        overlaymarkerTable.add(tab).bottom().left();
        let speed = 1;

        Time.setDeltaProvider(() => {
            return Core.graphics.getDeltaTime() * 60 * speed;
        });

        tab.table(Tex.pane, t => {

            const slider = new Slider(0, 9, 0.25, false);
            const button = new Button();
            const label = new Label("1.00");

            button.add(new Image(Core.atlas.find("tc-loading")));

            slider.changed(() => {
            speed = slider.getValue() + 1;
            label.setText(speed.toFixed(2));
            });

            button.clicked(() => {
                speed = 1;   
                slider.setValue(0);
                label.setText(speed.toFixed(2));
            });

            t.add(slider).width(150);
            t.add().width(15);
            t.add(label);
            t.add().width(15);
            t.add(button);

            t.visibility = () => {
                return Vars.ui.hudfrag.shown && !Vars.net.client();
            };

        });

    } catch(e){
        Vars.ui.showText("bruv",e);
    }
});

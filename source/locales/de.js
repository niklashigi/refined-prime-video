module.exports = {
  manifest: {
    description: 'Vereinfacht die Benutzeroberfläche von Amazon Prime Video und fügt nützliche Funktionen hinzu',
  },
  navigation: {
    home: 'Prime Video-Startseite',
    settings: 'Einstellungen',
    done: 'Fertig',
  },
  screens: {
    continueWatching: 'Weiterschauen',
    settings: 'Erweiterungs-Einstellungen',
  },
  continueWatching: {
    noRegion: {
      title: 'Keine Region ausgewählt!',
      description: [
        'Um die <em>Weiterschauen</em>-Funktionen nutzen zu können, wähle eine Region in den Einstellungen.',
        'Du kannst diese mit einem Klick auf das Symbol oben rechts öffnen.',
      ].join(' '),
    },
    noVideos: {
      title: 'Keine Videos gefunden!',
      description: "Stelle sicher, dass du die richtige Version in den Einstellungen ausgewählt hast und du bei Amazon angemeldet bist.",
    },
    loadingVideos: 'Videos werden geladen…',
    movie: 'Film',
  },
  settings: {
    region: {
      title: 'Was ist deine Amazon-Region?',
      description: "Diese Einstellung wird verwendet um deine <em>Weiterschauen</em>-Liste abzurufen.",
    },
    showSpoilers: {
      title: 'Wann sollen Spoiler angezeigt werden?',
      description: 'Das Vorschaubild und die Beschreibung von noch nicht angesehenen Episoden gelten als Spoiler.',
      options: {
        never: 'Spoiler nie anzeigen',
        onHover: 'Spoiler beim Drüberfahren anzeigen',
        always: 'Spoiler immer anzeigen',
      },
    },
  },
}

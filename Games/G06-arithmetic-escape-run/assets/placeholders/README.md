# Placeholder asset contract

The vertical slice deliberately uses runtime-generated placeholder textures from
`src/game/assets/PlaceholderAssetFactory.ts`. Palette, texture keys, dimensions,
and drawing rules are centralized there so licensed production art can replace
them without changing scene or gameplay code.

Replace these keys during the production-art pass:

- `forest-player-placeholder`
- `forest-trex-placeholder`
- chase-bar player and T-Rex icons
- low jump obstacle
- high slide obstacle
- perspective answer-gate frame

The Forest Ruins reference boards are not shipped as runtime assets. Character
reference sheets currently have opaque presentation backgrounds and therefore
must not be substituted directly for these textures.

No third-party game art, screenshots, audio, or extracted textures are included.

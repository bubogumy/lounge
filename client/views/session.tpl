<p class="clearfix">
	<button class="btn pull-right remove-session" {{#if current}}disabled{{else}}data-token="{{token}}"{{/if}}>{{#if current}}Current{{else}}Disconnect{{/if}}</button>

	<strong>{{agent}}</strong>
	<a href="https://ipinfo.io/{{ip}}" target="_blank" rel="noopener">{{ip}}</a>
	<br>
	{{localetime lastUse}} {{#if active}}<i>(currently active)</i>{{/if}}
</p>
